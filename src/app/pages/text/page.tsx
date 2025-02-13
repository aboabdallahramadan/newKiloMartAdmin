import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import AboutApp from "@/components/AppTexts/AboutApp";
import Terms from "@/components/AppTexts/Terms";

export const metadata: Metadata = {
  title: "App Texts",
  description: "App Texts",
};

const Settings = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto w-full max-w-[1080px]">
        <Breadcrumb pageName="Texts" />
        <div className="flex flex-col gap-10">
          <AboutApp />
          <Terms />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Settings;
