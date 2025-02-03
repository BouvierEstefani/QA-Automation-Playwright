// @ts-check
import { test, expect } from "@playwright/test";
import { request } from "http";

test("Add successfully a pet", async ({ request }) => {
  const newPet = await request.post("https://petstore.swagger.io/v2/pet", {
    data: {
      id: 1,
      category: {
        id: 1,
        name: "DOG",
      },
      name: "Ana",
      photoUrls: ["photourl"],
      tags: [
        {
          id: 1,
          name: "vaccinated",
        },
      ],
      status: "available",
    },
  });

  expect(newPet.status()).toBe(200);

  const responseBody = await newPet.json();
  const experctedJson = {
    id: 1,
    category: {
      id: 1,
      name: "DOG",
    },
    name: "Ana",
    photoUrls: ["photourl"],
    tags: [
      {
        id: 1,
        name: "vaccinated",
      },
    ],
    status: "available",
  };
  expect(responseBody).toEqual(experctedJson);
});

test("Add successfully a pet without optional filds", async ({ request }) => {
  const newPet = await request.post("https://petstore.swagger.io/v2/pet", {
    data: {
      name: "Ana",
      photoUrls: ["photourl"],
    },
  });
  expect(newPet.status()).toBe(200);

  const responseBody = await newPet.json();
  const experctedJson = {
    name: "Ana",
    photoUrls: ["photourl"],
    tags: [],
  };
  expect(responseBody).toMatchObject(experctedJson);
});
