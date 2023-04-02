import { defineField } from "sanity";

export const Post = defineField({
  name: "post",
  type: "document",
  title: "Post",
  fields: [
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Created",
      name: "creationDate",
      type: "date",
      options: {
        dateFormat: "YYYY-MM-DD",
        calendarTodayLabel: "Today",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Last Updated",
      name: "lastUpdatedDate",
      type: "date",
      options: {
        dateFormat: "YYYY-MM-DD",
        calendarTodayLabel: "Today",
      },
    },
    {
      name: "image",
      type: "image",
      title: "Preview Image",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      type: "text",
      title: "Description",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
      title: "Tags",
    },
    {
      title: "Content",
      name: "content",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          fields: [
            {
              type: "text",
              name: "alt",
              title: "Alternative text",
              description: `Some of your visitors cannot see images, 
              be they blind, color-blind, low-sighted; 
              alternative text is of great help for those 
              people that can rely on it to have a good idea of 
              what\'s on your page.`,
            },
            {
              type: "boolean",
              name: "isInline",
              title: "Is Inline?",
            },
          ],
        },
        defineField({
          type: "code",
          name: "codeBlock",
          title: "Code block",
        }),
      ],
      validation: (Rule) => Rule.required(),
    },
  ],
});
