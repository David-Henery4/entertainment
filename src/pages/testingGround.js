import React from "react";

// console.log("testing");

const mockUserBookmarks = [
  {
    id: 4,
    title: "yes",
    desc: "good",
    year: "2001",
    isBookmarked: true,
  },
  {
    id: 2,
    title: "yes",
    desc: "good",
    year: "2001",
    isBookmarked: true,
  },
  {
    id: 9,
    title: "yes",
    desc: "good",
    year: "2001",
    isBookmarked: true,
  },
  {
    id: 5,
    title: "yes",
    desc: "good",
    year: "2001",
    isBookmarked: true,
  },
];

const mockContent = [
  {
    id: 1,
    title: "yes",
    desc: "good",
    year: "2001",
    isBookmarked: false,
  },
  {
    id: 2,
    title: "yes",
    desc: "good",
    year: "2001",
    isBookmarked: false,
  },
  {
    id: 3,
    title: "yes",
    desc: "good",
    year: "2001",
    isBookmarked: false,
  },
  {
    id: 4,
    title: "yes",
    desc: "good",
    year: "2001",
    isBookmarked: false,
  },
  {
    id: 5,
    title: "yes",
    desc: "good",
    year: "2001",
    isBookmarked: false,
  },
  {
    id: 6,
    title: "yes",
    desc: "good",
    year: "2001",
    isBookmarked: false,
  },
  {
    id: 7,
    title: "yes",
    desc: "good",
    year: "2001",
    isBookmarked: false,
  },
  {
    id: 8,
    title: "yes",
    desc: "good",
    year: "2001",
    isBookmarked: false,
  },
  {
    id: 9,
    title: "yes",
    desc: "good",
    year: "2001",
    isBookmarked: false,
  },
  {
    id: 10,
    title: "yes",
    desc: "good",
    year: "2001",
    isBookmarked: false,
  },
];

// console.log(mockUserBookmarks)

const checking = () => {
  const newContent = []
  const updated = mockContent.map((contentItem) => {
    mockUserBookmarks.forEach(bookmarkItem => {
      if (contentItem.id === bookmarkItem.id){
        contentItem.isBookmarked = true
      }
    })
    return contentItem
  })
  console.log(updated)
}
// checking()

const testingGround = () => {
  return <div>testingGround</div>;
};

export default testingGround;
