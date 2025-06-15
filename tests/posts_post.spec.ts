import { test, expect } from "@playwright/test";
import { examplePost, withID } from "../utils/postExample";

test.describe("tests on /posts with POST method", () => {
  test("POST /posts response should contain post details in body", async ({
    page,
  }) => {
    const postResponse = await page.request.post(
      "https://crudcrud.com/api/8656b53858ee45b9ac5778dfebeba8b7/posts",
      { data: examplePost }
    );

    const jsonData = await postResponse.json();

    expect(postResponse.status()).toBe(201);
    expect(jsonData.title).toBe(examplePost.title);
    expect(jsonData.content).toBe(examplePost.content);
  });

  test("POST /posts should return data in json format", async ({ page }) => {
    const postResponse = await page.request.post(
      "https://crudcrud.com/api/8656b53858ee45b9ac5778dfebeba8b7/posts",
      { data: { examplePost } }
    );

    expect(postResponse.headers()["content-type"]).toContain(
      "application/json"
    );
  });
});
