// mutations.ts
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * Create a timeline, add files, and submit in a single operation
 */
export const createTimeline = mutation({
  args: {
    // timeline details
    name: v.string(),
    areaOfLaw: v.string(),

    // Files information (already uploaded to EdgeStore)
    files: v.array(
      v.object({
        name: v.string(),
        url: v.string(),
        size: v.optional(v.number()),
      })
    ),

    // Submit status (default is true)
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const userId = identity?.subject;
    const timestamp = Date.now();

    // 1. Create the timeline
    const timelineId = await ctx.db.insert("timeline", {
      name: args.name,
      areaOfLaw: args.areaOfLaw,
      createdAt: timestamp,
      updatedAt: timestamp,
      createdBy: userId,

      fileIds: [], // Will be updated after file creation
    });

    // 2. Add files to the timeline
    const fileIds = [];
    for (const file of args.files) {
      const fileId = await ctx.db.insert("files", {
        ...file,
        timelineId: timelineId,
      });
      fileIds.push(fileId);
    }

    // 3. Update the timeline with file IDs
    await ctx.db.patch(timelineId, {
      fileIds: fileIds,
    });

    // Return all the created data
    return {
      timelineId,
      fileIds,
    };
  },
});

export const getAllTimelines = query({
  // Optional args for filtering
  args: {},

  handler: async (ctx) => {
    // Query all timelines
    // Sorted by creation date (newest first)
    const timelines = await ctx.db.query("timeline").order("desc").collect();

    // For each timeline, fetch its related files
    const timelinesWithFiles = await Promise.all(
      timelines.map(async (timeline) => {
        // Get files related to this timeline
        const files = await ctx.db
          .query("files")
          .filter((q) => q.eq(q.field("timelineId"), timeline._id))
          .collect();

        // Return timeline with its files
        return {
          ...timeline,
          files,
        };
      })
    );

    // Return the timelines with their files
    return timelinesWithFiles;
  },
});
