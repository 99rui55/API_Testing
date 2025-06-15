import { test, expect } from "@playwright/test";
import { examplePost, withID } from "../utils/postExample";

test.describe("tests on /posts/{id} with GET method", () => {
  test("GET /posts/{id} response should contain the matching post details in body", async ({
    page,
  }) => {
    const postResponse = await page.request.post(
      "https://crudcrud.com/api/8656b53858ee45b9ac5778dfebeba8b7/posts",
      { data: examplePost }
    );

    const postJson = await postResponse.json();
    const post_id = postJson._id;
    const getResponse = await page.request.get(
      `https://crudcrud.com/api/8656b53858ee45b9ac5778dfebeba8b7/posts/${post_id}`
    );
    const getJson = await getResponse.json();

    expect(getResponse.status()).toBe(200);
    expect(getJson.title).toBe(examplePost.title);
    expect(getJson.content).toBe(examplePost.content);
  });

  test("GET /posts/{id} should return data in json format", async ({
    page,
  }) => {
    const postResponse = await page.request.post(
      "https://crudcrud.com/api/8656b53858ee45b9ac5778dfebeba8b7/posts",
      { data: examplePost }
    );

    const postJson = await postResponse.json();
    const post_id = postJson._id;

    const getResponse = await page.request.get(
      `https://crudcrud.com/api/8656b53858ee45b9ac5778dfebeba8b7/posts/${post_id}`
    );

    expect(getResponse.headers()["content-type"]).toContain("application/json");
  });

  test("GET /posts/{id} with a non existing id response should have code status 404", async ({
    page,
  }) => {
    const getResponse = await page.request.get(
      //invalid id: "0"
      "https://crudcrud.com/api/8656b53858ee45b9ac5778dfebeba8b7/posts/0"
    );

    expect(getResponse.status()).toBe(404);
  });
});
