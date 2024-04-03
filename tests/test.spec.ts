import { test as base } from "@playwright/test";

export const test = base.extend({
    context: async ({ context }, use) => {
        context.on("page", async (page) => {
            await page.route(
                new RegExp(".*"),
                (route, request) => {
                    const headers = {
                        ...request.headers(),
                        "X-Foo": "bar",
                    };
                    void route.continue({ headers });
                },
            );
        });
        await use(context);
    },
});

test("scenario 1", async ({ page }) => {
    // Use page fixture
    // SUCCESS: header appears in request as expected
    await page.goto("/");
});

test("scenario 2", async ({ context }) => {
    // Create page object from context
    // SUCCESS: header appears in request as expected
    const page = await context.newPage();
    await page.goto("/");
});

test("scenario 3", async ({ page, context }) => {
    await page.goto("/");

    // Click link with `target="_blank"` attribute to open new tab
    // FAIL: header does **not** appear in request on new page object (newPage)
    const pagePromise = context.waitForEvent("page");
    await page.getByRole("link", { name: "Link" }).click();
    const newPage = await pagePromise;
    await newPage.waitForLoadState();

    // SUCCESS: header appears in subsequent requests using same page object
    await newPage.goto("/");
});
