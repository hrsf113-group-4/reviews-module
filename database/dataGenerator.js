/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */

const faker = require("faker");

class Review {
  constructor() {
    (this.username = faker.internet.userName()),
      (this.initials =
        faker.name.firstName().slice(0, 1) + faker.name.lastName().slice(0, 1)),
      (this.profilePic = faker.internet.avatar()),
      (this.city = faker.address.city()),
      (this.review = faker.lorem.sentences()),
      (this.noise = Math.floor(Math.random() * 3 + 1)),
      (this.createdAt = faker.date.past()),
      (this.recommended = Math.floor(Math.random() * 60 + 40)),
      (this.foodRating = Math.floor(Math.random() * 5 + 1)),
      (this.ambianceRating = Math.floor(Math.random() * 5 + 1)),
      (this.serviceRating = Math.floor(Math.random() * 5 + 1)),
      (this.valueRating = Math.floor(Math.random() * 5 + 1)),
      (this.overallRating = Math.floor(Math.random() * 5 + 1)),
      (this.reviewCount = Math.floor(Math.random() * 50));
  }
}

const makeReview = () => {
  const numberOfReviews = Math.floor(Math.random() * 1000 + 500);
  const results = [];
  for (let i = 0; i < numberOfReviews; i++) {
    const review = new Review();
    results.push(review);
  }
  return results;
};

const filterWords = () => {
  const randomWords = [];
  const filterKeyWordCount = Math.random() * 5;
  for (let j = 0; j < filterKeyWordCount; j++) {
    randomWords.push(faker.lorem.paragraph().split(" ")[2]);
  }
  return randomWords;
};

const mockData = [];

const createMockData = () => {
  for (let i = 1; i < 10; i++) {
    const restaurant = {
      id: i,
      name: faker.company.companyName(),
      reviews: makeReview(),
      filters: filterWords()
    };
    mockData.push(restaurant);
  }
};

createMockData();

module.exports = mockData;
