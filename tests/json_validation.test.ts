import addFormats from "ajv-formats";
import Ajv from "ajv/dist/2020";
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const projectJsonPath = path.resolve(process.cwd(), "src/data/project.json");
const projectSchemaPath = path.resolve(
    process.cwd(),
    "tests/schemas/project.schema.json",
);
const studyJsonPath = path.resolve(process.cwd(), "src/data/study.json");
const studySchemaPath = path.resolve(
    process.cwd(),
    "tests/schemas/study.schema.json",
);

const localesPath = path.resolve(process.cwd(), "src/data/locales.json");
const locales = Object.keys(JSON.parse(fs.readFileSync(localesPath, "utf-8")));
const localeFiles = locales.map((locale) =>
    path.resolve(process.cwd(), `messages/${locale}.json`),
);

describe("project.json schema", () => {
    it("matches the JSON schema", () => {
        const schema = JSON.parse(fs.readFileSync(projectSchemaPath, "utf-8"));
        const data = JSON.parse(fs.readFileSync(projectJsonPath, "utf-8"));

        const ajv = new Ajv({ allErrors: true, strict: true });
        addFormats(ajv);

        const validate = ajv.compile(schema);
        const isValid = validate(data);

        if (!isValid) {
            const errorText = ajv.errorsText(validate.errors, {
                separator: "\n",
            });
            throw new Error(errorText);
        }

        expect(isValid).toBe(true);
    });

    localeFiles.forEach((localeFile, index) => {
        it(`For ${locales[index]} : checks that each project id in project.json has a corresponding entry in ${path.basename(localeFile)}`, () => {
            const projectData = JSON.parse(
                fs.readFileSync(projectJsonPath, "utf-8"),
            );

            const projectDataID = new Set(
                projectData.map(
                    (project: { id: string | number }) => project.id,
                ),
            );

            const localeData = JSON.parse(fs.readFileSync(localeFile, "utf-8"));
            const missingIds: string[] = [];

            Object.keys(localeData.HomePage.projectsContent).forEach(
                (project: string) => {
                    if (!projectDataID.has(project)) {
                        missingIds.push(project);
                    }
                },
            );

            if (missingIds.length > 0) {
                throw new Error(
                    `The following project ids in project.json do not have a corresponding entry in ${path.basename(localeFile)}: ${missingIds.join(
                        ", ",
                    )}`,
                );
            }
        });
    });
});

describe("study.json schema", () => {
    it("matches the JSON schema", () => {
        const schema = JSON.parse(fs.readFileSync(studySchemaPath, "utf-8"));
        const data = JSON.parse(fs.readFileSync(studyJsonPath, "utf-8"));

        const ajv = new Ajv({ allErrors: true, strict: true });
        addFormats(ajv);
        const validate = ajv.compile(schema);
        const isValid = validate(data);
        if (!isValid) {
            const errorText = ajv.errorsText(validate.errors, {
                separator: "\n",
            });
            throw new Error(errorText);
        }
        expect(isValid).toBe(true);
    });

    it("checks that each project id in study.json correspond to an id  in project", () => {
        const projectData = JSON.parse(
            fs.readFileSync(projectJsonPath, "utf-8"),
        );
        const studyData = JSON.parse(fs.readFileSync(studyJsonPath, "utf-8"));
        const projectIds = new Set(
            projectData.map((project: { id: string | number }) => project.id),
        );

        const missingProjectIds: string[] = [];
        studyData.forEach((study: { lessons: { projects: string[] }[] }) => {
            study.lessons.forEach((lesson: { projects?: string[] }) => {
                lesson.projects?.forEach((projectId: string) => {
                    if (!projectIds.has(projectId)) {
                        missingProjectIds.push(projectId);
                    }
                });
            });
        });

        if (missingProjectIds.length > 0) {
            throw new Error(
                `The following project ids in study.json do not correspond to any id in project.json: ${missingProjectIds.join(
                    ", ",
                )}`,
            );
        }
    });

    localeFiles.forEach((localeFile, index) => {
        it(`For ${locales[index]} : checks that each lesson id in study.json has a corresponding entry in ${path.basename(localeFile)}`, () => {
            const studyData = JSON.parse(
                fs.readFileSync(studyJsonPath, "utf-8"),
            );
            const studyID = studyData.map(
                (study: { id: string | number }) => study.id,
            );
            const lessonIds: { [key: string]: Set<string> } = {};
            studyID.forEach((id: string) => {
                lessonIds[id] = new Set();
            });

            studyData.forEach(
                (study: { lessons: { id: string }[]; id: string }) => {
                    study.lessons.forEach((lesson: { id: string }) => {
                        lessonIds[study.id].add(lesson.id);
                    });
                },
            );

            console.log(lessonIds);
            const localeData = JSON.parse(fs.readFileSync(localeFile, "utf-8"));

            const missingIds: string[] = [];
            studyID.forEach((id: string) => {
                if (!localeData.HomePage[id]) {
                    throw new Error(
                        `The study id ${id} in study.json does not have a corresponding entry in ${path.basename(localeFile)}`,
                    );
                }
                Object.keys(localeData.HomePage[id].lessons).forEach(
                    (lesson: string) => {
                        if (!lessonIds[id].has(lesson)) {
                            missingIds.push(lesson);
                        }
                    },
                );
            });

            if (missingIds.length > 0) {
                throw new Error(
                    `The following lesson ids in study.json do not have a corresponding entry in ${path.basename(localeFile)}: ${missingIds.join(
                        ", ",
                    )}`,
                );
            }
        });
    });
});
