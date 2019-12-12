describe("Cat Collector", () => {
  it("it can collect a cat", () => {
    cy.visit("http://localhost:3000");
    cy.findByText("Purrrfect").click();
    cy.findByText("Your Kitty Collection")
      .siblings(".collection-grid")
      .find("img");
  });
  it("it can ignore a cat", () => {
    cy.findByText("Get Another").click();
    cy.findByText("Still in the running")
      .siblings(".collection-grid")
      .find("img");
  });
  it("can search for a specific kind of cat", () => {
    cy.findByText("Or search for your dream cat").click();
    cy.findByLabelText("Category:").select("hats");
    cy.findByLabelText("Breed:").select("Bengal");
    cy.findByText("FIND THAT CAT").click();
  });
});
