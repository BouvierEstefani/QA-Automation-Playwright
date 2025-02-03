// @ts-check
import { test, expect } from "@playwright/test";
import { request } from "http";

test("Get successfully a pet", async ({ request }) => {
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

  const petId = 1;
  const pet = await request.get(`https://petstore.swagger.io/v2/pet/${petId}`);
  expect(pet.status()).toBe(200);
  const response = await pet.json();
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
  expect(response).toEqual(experctedJson);
});

test("Not found a pet error", async ({ request }) => {
  const petId = 1000;

  await request.delete(`https://petstore.swagger.io/v2/pet/${petId}`);

  const notFoundPet = await request.get(
    `https://petstore.swagger.io/v2/pet/${petId}`
  );
  expect(notFoundPet.status()).toBe(404);
  const response = await notFoundPet.json();
  const experctedJson = {
    code: 1,
    type: "error",
    message: "Pet not found",
  };
  expect(response).toEqual(experctedJson);
});

test("Null parameter error", async ({ request }) => {
  const petId = null;

  const nullParameterError = await request.get(
    `https://petstore.swagger.io/v2/pet/${petId}`
  );
  expect(nullParameterError.status()).toBe(404);
});
