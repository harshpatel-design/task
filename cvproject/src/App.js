import "./index.css";
import logo from "../src/image/user2.webp";
import company from "../src/image/company.jpg";
import ExperienceCard from "./components/ExperienceCard";
import SectionTitle from "./components/SectionTitle";
import EducationCard from "./components/EducationCard";
import Heading from "./components/Heading";
import ListItem from "./components/ListItem";
import AwardCard from "./components/AwardCard";
import PersonalInfo from "./components/PersonalInfo";
import ProfileCard from "./components/ProfileCard";

function App() {
  return (
    <div className="App bg-white flex w-full h-full mt-5 mb-5 justify-center">
      <div className="border container  containerBox border-gray-200 mt-4">
        <div className="grid grid-cols-12 h-full gap-4">
          <div className="w-full col-span-5  leftSide">
            <ProfileCard logo={logo} name="John Doe" role="Software Engineer" />

            <PersonalInfo
              items={[
                "Surakarta, December 2, 1994",
                "+1 234 567 890",
                "admin@yopmail.com",
                "Yogyakarta, Indonesia",
              ]}
            />
            <Heading title="Skills" />
            <ListItem
              items={[
                "HTML and CSS",
                "Scripting language (e.g., JavaScript, TypeScript, Python)",
                "Frontend Framework (e.g., React, Vue.js)",
                "Backend Framework (e.g., Node.js, Express.js)",
                "Database (e.g., MySQL, PostgreSQL, MongoDB)",
              ]}
            />

            <Heading title="Honors & Awards" />

            <AwardCard
              title="Best Web Developer"
              year="2023"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet adipisicing consectetur"
            />

            <Heading title="Hobbies & Interests" />
            <ListItem items={["Reading Books", "Playing Games", "Traveling"]} />
          </div>

          <div className="w-full col-span-7 h-full bg-white rightSide">
            <ul className="flex flex-col gap-5">
              <li className="w-fit">
                <SectionTitle title="About" />
              </li>

              <li>
                <p className="text-[#747D8C] text-[12px]">
                  lorem ipsum dolor sit amet consectetur adipisicing elit lorem
                  ipsum dolor sit amet elit lorem ipsum dolor sit amet
                  consectetur adipisicing elit lorem ipsum dolor sit amet
                  consectetur adipisicing elit lorem ipsum dolor sit amet elit
                </p>
              </li>

              <li className="w-fit mt-3">
                <SectionTitle title="Education" />
              </li>

              <li>
                <EducationCard
                  year="2015 - 2019"
                  university='Informatics, Universal Pemalang Nasional "Veteran" Yogyakarta'
                  degree="Bachelor of Computer Science, Artificial Intelligence"
                  description="Lorem ipsum dolor sit amet consectetur adipisicing elit lorem ipsum dolor sit amet elit."
                />
              </li>

              <li className="w-fit mt-3">
                <SectionTitle title="Experience" />
              </li>

              <li>
                <ExperienceCard
                  logo={company}
                  company="Upwork"
                  role="UI Engineer"
                  duration="Nov 2019 - Nov 2019"
                  description="ipsum dolor sit amet consectetur adipisicing elit lorem ipsum dolor sit amet elit consectetur adipisicing elit lorem ipsum dolor sit amet consectetur adipisicing elit lorem ipsum dolor sit amet elit"
                />
              </li>

              <li>
                <ExperienceCard
                  logo="https://cdn.svglogos.dev/logos/centos-icon.svg"
                  company="Network"
                  role="Web Developer"
                  duration="Nov 2019 - Nov 2019"
                  description="ipsum dolor sit amet consectetur adipisicing elit lorem consectetur adipisicing elit lorem ipsum dolor sit amet elit"
                />
              </li>

              <li>
                <ExperienceCard
                  logo="https://www.ibm.com/brand/experience-guides/developer/8f4e3cc2b5d52354a6d43c8edba1e3c9/02_8-bar-reverse.svg"
                  company="IBM"
                  role="Frontend Developer"
                  duration="Nov 2019 - Present"
                  description="Lorem ipsum dolor sit amet consectetur adipisicing elit lorem ipsum dolor sit amet elit lorem ipsum dolor sit amet"
                />
              </li>

              <li className="w-fit mt-3">
                <SectionTitle title="Volunter Experience" />
              </li>

              <li>
                <ExperienceCard
                  logo="https://cdn.svglogos.dev/logos/pandacss-icon.svg"
                  company="Panda"
                  role="Frontend Developer"
                  duration="Oct 2020 - Present"
                  description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
