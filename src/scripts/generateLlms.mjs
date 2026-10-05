import fs from "node:fs";
import path from "node:path";

import en from "../../messages/en.json" with { type: "json" };
import fr from "../../messages/fr.json" with { type: "json" };
import study_element from "../data/study.json" with { type: "json" };
import project_element from "../data/project.json" with { type: "json" };

const routes = [
    { path: "", trad: fr },
    { path: "/fr", trad: fr },
    { path: "/en", trad: en },
];

const studies = ["centrale", "univ", "fermat"];

for (const route of routes) {
    const directory = path.join(process.cwd(), "public", route.path);

    const traduction = route.trad;

    const studiesTrad = studies.map((study) => ({
        title: traduction.HomePage[study].title,
        description: traduction.HomePage[study].description,
        lessons: traduction.HomePage[study].lessons,
        element: study_element.find((s) => s.id === study) || {},
    }));

    const projectsTrad = Object.keys(traduction.HomePage.projectsContent).map((project) => ({
        name: traduction.HomePage.projectsContent[project].name,
        description: traduction.HomePage.projectsContent[project].description,
        paragraph: traduction.HomePage.projectsContent[project]?.paragraph,
        element: project_element.find((p) => p.id === project) || {},
    }));

    fs.mkdirSync(directory, { recursive: true });

    const content = `# ${traduction.Metadata.title}

${traduction.HomePage.introduction}

## ${traduction.HomePage.study}

${studiesTrad
        .map(
            (study) =>
                `### ${study.title}\n\n${study.description}\n\n${Object.entries(
                    study.lessons,
                )
                    .map(
                        ([, lesson]) =>
                            `- ${lesson.name} : ${lesson.description}`,
                    )
                    .join("\n")}
                ${study.element?.link ? `\n[${traduction.HomePage["link-school"]}](${study.element.link})`:""}`,
        )
        .join("\n\n")}

## ${traduction.HomePage.project}

${traduction.HomePage["desc-projects"]}
    
${projectsTrad
        .map(
            (project) =>
                `### ${project.name}\n\n${project.description}${project?.paragraph ? (
                    `\n\n${project.paragraph.text}\n\n${project.paragraph.li.map((li) => `- ${li}`).join("\n")}`
                ): ""}
${project.element?.repo ? `\n[${traduction.HomePage["link-repo"]}](${project.element.repo})` : ''}${project.element?.websites ? `\n${project.element?.websites.map(element => `[${element.name}](${element.url})`)
        .join("\n")}\n` : '\n'}`
        )
        .join("\n")}`;

    fs.writeFileSync(path.join(
        directory, "llms.txt"),
        content.replace(/\r?\n/g, "\r\n"),
        "utf8"
    );
}
