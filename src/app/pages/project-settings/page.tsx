import React from 'react'
import { Metadata } from "next";
import DefaultLayout from '@/components/Layouts/DefaultLaout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import ProjectSettings from '@/components/ProjectSettings/ProjectSettings';

export const metadata: Metadata = {
    title: "Project Settings",
    description: "Project Settings",
  };
const page = () => {
  return (
    <DefaultLayout>
        <Breadcrumb pageName='Project Settings' />
        <ProjectSettings />
    </DefaultLayout>
  )
}

export default page