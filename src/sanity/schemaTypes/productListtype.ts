import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productListType = defineType({
  name: "productList",
  title: "productList",
  type: "document",
  icon: TrolleyIcon,
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "inStock",
      title: "In Stock",
      type: "boolean",
      description: "Indicates whether the product is currently in stock",
      initialValue: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Brief description of the product",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "discountPrice",
      title: "Discount Price",
      type: "number",
      description: "Discounted price of the product (optional)",
      validation: (Rule) =>
        Rule.custom((discountPrice, context) => {
          const doc = context.document;
          if (doc && typeof doc.price === "number") {
            if (discountPrice && discountPrice >= doc.price) {
              return "Discount price must be less than the original price";
            }
          }
          return true;
        }),
    }),
    defineField({
      name: "colors",
      title: "Available Colors",
      type: "array",
      of: [
        {
          type: "string",
          title: "Color Code",
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "department",
      title: "Department",
      type: "string",
      options: {
        list: [
          { title: "Women's Wear", value: "Women's Wear" },
          { title: "Event Wear", value: "Event Wear" },
          { title: "Seasonal Wear", value: "Seasonal Wear" },
          { title: "Outerwear", value: "Outerwear" },
          { title: "Professional Wear", value: "Professional Wear" },
          { title: "Cultural Wear", value: "Cultural Wear" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Average Rating",
      type: "number",
      description: "Average rating from 0 to 5",
      validation: (Rule) => Rule.min(0).max(5).precision(1),
    }),
    defineField({
      name: "stock",
      title: "Stock Quantity",
      type: "number",
      description: "Number of items available in stock",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "reviews",
      title: "Reviews",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Reviewer Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "rating",
              title: "Rating",
              type: "number",
              validation: (Rule) => Rule.required().min(1).max(5),
            },
            {
              name: "comment",
              title: "Comment",
              type: "text",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "date",
              title: "Date",
              type: "datetime",
              initialValue: new Date().toISOString(),
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
      subtitle: "price",
      inStock: "inStock",
      stock: "stock",
    },
    prepare({ title, subtitle, media, inStock, stock }) {
      return {
        title,
        subtitle: `$${subtitle} | ${inStock ? `In Stock (${stock})` : "Out of Stock"}`,
        media,
      };
    },
  },
});