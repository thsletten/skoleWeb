import React from "react";
import { create } from "react";
import { MemoryRouter } from "react-router-dom";
import { MoviesApplication } from "../moviesApplication";

describe("MoviesApplication component", () => {
  it("renders without crashing", () => {
    const component = create(
      <MemoryRouter>
        <MoviesApplication />
      </MemoryRouter>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
