import { TagIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

/**
 * This file is the schema definition for a category/topic.
 *
 * Categories help organize your posts by topics like:
 * - Frontend Development
 * - Backend Development  
 * - DevOps Tools
 * - Design Tools
 * - AI & Machine Learning
 * - Mobile Development
 */

export default defineType({
  name: 'category',
  title: 'Category',
  icon: TagIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief description of what this category covers',
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'Hex color code for this category (e.g., #3B82F6)',
      validation: (rule) => 
        rule.regex(/^#([0-9A-F]{3}){1,2}$/i, {
          name: 'hex',
          invert: false,
        }).warning('Please enter a valid hex color code (e.g., #3B82F6)'),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Optional emoji or icon to represent this category',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
      color: 'color',
      icon: 'icon',
    },
    prepare({ title, description, color, icon }) {
      return {
        title: icon ? `${icon} ${title}` : title,
        subtitle: description,
        media: TagIcon,
      }
    },
  },
})
