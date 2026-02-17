/**
 * Available sorting/ordering options for projects
 * @type {const} Readonly array of string literals representing project order types
 * @description
 * - 'default': Original order from the data source
 * - 'date': Chronologically sorted by start date (newest first)
 * - 'lexicographical': Alphabetically sorted by project name
 */
export const orderProjectList = ["default", "date", "lexicographical"] as const;

/**
 * Date formatting options for displaying project/study periods
 * @type {const} Readonly object with date format configuration
 * @description
 * Formats dates as "Month Year" (e.g., "January 2024") in UTC timezone
 * Used with `Intl.DateTimeFormat` and next-intl's useFormatter hooks
 * @example
 * // With next-intl
 * const format = useFormatter();
 * format.dateTime(new Date("2024-01-15"), dateFormatOptions) // "January 2024"
 */
export const dateFormatOptions = {
    year: "numeric",
    month: "long",
    timeZone: "UTC",
} as const;
