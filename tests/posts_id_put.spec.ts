import { test, expect } from "@playwright/test";
import { emptyExamplePost, examplePost, withID } from "../utils/postExample";

test.describe("tests on /posts/{id} with PUT method", () => {
  test("PUT /posts/{id} response should have status code 200", async ({
    page,
  }) => {
    const postResponse = await page.request.post(
      "https://crudcrud.com/api/8656b53858ee45b9ac5778dfebeba8b7/posts",
      { data: examplePost }
    );
    const postJson = await postResponse.json();
    const post_id = postJson._id;
    const getResponse = await page.request.put(
      `https://crudcrud.com/api/8656b53858ee45b9ac5778dfebeba8b7/posts/${post_id}`,
      { data: examplePost }
    );
    expect(getResponse.status()).toBe(200);
  });
  test("PUT /posts/{id} with a non existing id response should have code status 404", async ({
    page,
  }) => {
    const getResponse = await page.request.put(
      //invalid id: "0"
      "https://crudcrud.com/api/8656b53858ee45b9ac5778dfebeba8b7/posts/0"
    );
    expect(getResponse.status()).toBe(404);
  });
  test("PUT /posts/{id} should update the fields and values", async ({
    page,
  }) => {
    const postResponse = await page.request.post(
      "https://crudcrud.com/api/8656b53858ee45b9ac5778dfebeba8b7/posts",
      { data: emptyExamplePost }
    );
    const postJson = await postResponse.json();
    const post_id = postJson._id;
    await page.request.put(
      `https://crudcrud.com/api/8656b53858ee45b9ac5778dfebeba8b7/posts/${post_id}`,
      { data: examplePost }
    );
    const getResponse = await page.request.get(
      `https://crudcrud.com/api/8656b53858ee45b9ac5778dfebeba8b7/posts/${post_id}`
    );
    const getJson = await getResponse.json();
    expect(getJson.title).toBe(examplePost.title);
    expect(getJson.content).toBe(examplePost.content);
  });
});
