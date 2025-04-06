import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Table for storing timeline details
  timeline: defineTable({
    // Basic timeline information
    name: v.string(),
    areaOfLaw: v.string(),

    // Creation and update timestamps
    createdAt: v.number(),
    updatedAt: v.number(),

    // User who created the timeline (assuming you have authentication)
    createdBy: v.optional(v.string()),



    // Relationships
    fileIds: v.array(v.id("files")),
  }),

  // Table for storing file information
  files: defineTable({
    // File information
    name: v.string(),
    url: v.string(),
    size: v.optional(v.number()),

    // Related timeline
    timelineId: v.id("timeline"),
  }),
});
