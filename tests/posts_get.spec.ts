import { test, expect } from "@playwright/test";
import { examplePost, withID } from "../utils/postExample";

test.describe("tests on /posts with GET method", () => {
  test("GET /posts should return all existing posts with correct details and status code 200", async ({
    request,
  }) => {
    const postResponse = await request.post(
      "https://crudcrud.com/api/8656b53858ee45b9ac5778dfebeba8b7/posts",
      { data: examplePost }
    );
    const postResponseJson = await postResponse.json();
    const postId = postResponseJson._id;
    const newPost = withID(postId);
    const getResponse = await request.get(
      "https://crudcrud.com/api/8656b53858ee45b9ac5778dfebeba8b7/posts"
    );
    const jsonBody = await getResponse.json();
    expect(jsonBody).toContainEqual(newPost);
    expect(getResponse.status()).toBe(200);
  });
  test("GET /posts should return data in json format", async ({ page }) => {
    const getResponse = await page.request.get(
      "https://crudcrud.com/api/8656b53858ee45b9ac5778dfebeba8b7/posts"
    );
    expect(getResponse.headers()["content-type"]).toContain("application/json");
  });
  test("every Json object that is retuned with /posts GET should have an _id property.", async ({
    page,
  }) => {
    const getResponse = await page.request.get(
      "https://crudcrud.com/api/8656b53858ee45b9ac5778dfebeba8b7/posts"
    );
    const jsonData = await getResponse.json();
    for (const post of jsonData) {
      expect(post).toHaveProperty("_id");
    }
  });
});
