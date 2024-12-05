import { MoviesApplication } from "../moviesApplication";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";

describe("movie application", () => {
  it("renders front page", () => {
    let component;
    act(() => {
      component = renderer.create(
        <MemoryRouter>
          <MoviesApplication />
        </MemoryRouter>,
      );
    });
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("lists movies", async () => {
    const mockFetchMovies = jest.fn().mockResolvedValue([
      { id: 1, title: "Oppenheimer" },
      { id: 2, title: "Barbie" },
    ]);

    let component;
    await act(async () => {
      component = renderer.create(
        <MemoryRouter initialEntries={["/movies"]}>
          <MoviesApplication fetchMovies={mockFetchMovies} />
        </MemoryRouter>,
      );
    });

    // Ensure the component has updated with the fetched movies
    await act(async () => {
      await Promise.resolve(); // Wait for any pending promises
    });

    expect(component.toJSON()).toMatchSnapshot();
    expect(component.root.findByType("h2").children.join(" ")).toBe(
      "Listing of all movies",
    );
  });
});
