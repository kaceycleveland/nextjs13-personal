import { defineField, defineType } from "sanity";

export const Post = defineType({
  name: "post",
  type: "document",
  title: "Post",
  fields: [
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Created",
      name: "creationDate",
      type: "date",
      options: {
        dateFormat: "YYYY-MM-DD",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Last Updated",
      name: "lastUpdatedDate",
      type: "date",
      options: {
        dateFormat: "YYYY-MM-DD",
      },
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Preview Image",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
      title: "Tags",
    }),
    defineField({
      title: "Content",
      name: "content",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          fields: [
            defineField({
              type: "text",
              name: "alt",
              title: "Alternative text",
              description: `Some of your visitors cannot see images, 
              be they blind, color-blind, low-sighted; 
              alternative text is of great help for those 
              people that can rely on it to have a good idea of 
              what\'s on your page.`,
            }),
            {
              type: "boolean",
              name: "isInline",
              title: "Is Inline?",
            },
          ],
        },
        defineField({
          type: "object",
          name: "myCodeField",
          title: "Code block",
          fields: [
            {
              title: "Language",
              name: "language",
              type: "string",
            },
            {
              title: "Content",
              name: "code",
              type: "text",
            },
          ],
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
});
