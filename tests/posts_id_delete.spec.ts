import { test, expect } from "@playwright/test";
import { emptyExamplePost, examplePost, withID } from "../utils/postExample";

test.describe("tests on /posts/{id} with DELETE method", () => {
  test("DELETE /posts/{id} response should have status code 200", async ({
    page,
  }) => {
    const postResponse = await page.request.post(
      "https://crudcrud.com/api/8656b53858ee45b9ac5778dfebeba8b7/posts",
      { data: examplePost }
    );
    const postJson = await postResponse.json();
    const post_id = postJson._id;
    const getResponse = await page.request.delete(
      `https://crudcrud.com/api/8656b53858ee45b9ac5778dfebeba8b7/posts/${post_id}`,
      { data: examplePost }
    );
    expect(getResponse.status()).toBe(200);
  });

  test("DELETE /posts/{id} with a non existing id response should have code status 404", async ({
    page,
  }) => {
    const getResponse = await page.request.delete(
      //invalid id: "0"
      "https://crudcrud.com/api/8656b53858ee45b9ac5778dfebeba8b7/posts/0"
    );
    expect(getResponse.status()).toBe(404);
  });

  test("DELETE /posts/{id} should delete the post", async ({ page }) => {
    const postResponse = await page.request.post(
      "https://crudcrud.com/api/8656b53858ee45b9ac5778dfebeba8b7/posts",
      { data: examplePost }
    );
    const postJson = await postResponse.json();
    const post_id = postJson._id;
    await page.request.delete(
      `https://crudcrud.com/api/8656b53858ee45b9ac5778dfebeba8b7/posts/${post_id}`,
      { data: examplePost }
    );
    const getResponse = await page.request.get(
      `https://crudcrud.com/api/8656b53858ee45b9ac5778dfebeba8b7/posts/${post_id}`
    );

    expect(getResponse.status()).toBe(404);
  });
});
