import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BasicLayout from '@/layouts/BasicLayout';

// pages
import Main from '@/pages/Main';
import Projects from '@/pages/Projects';
import Issues from '@/pages/Issues';
import IssueDetail from '@/pages/Issues/Detail';
import Statistics from '@/pages/Statistics';

import Test from '@/pages/Test';

// url constants
import { ROUTES } from '@/constants/routes';

export const RouterConfig = () => {
  return (
    <BrowserRouter>
      <BasicLayout>
        <Routes>
          <Route path={ROUTES.ROOT} element={<Main />} />
          <Route path={ROUTES.PROJECTS} element={<Projects />} />
          <Route path={ROUTES.ISSUES} element={<Issues />} />
          <Route path={`${ROUTES.ISSUES}/:id`} element={<IssueDetail />} />
          <Route path={ROUTES.STATISTICS} element={<Statistics />} />

          <Route path='/test' element={<Test />} />

          <Route path="*" element={<Navigate to={ROUTES.ROOT} />} />
        </Routes>
      </BasicLayout>
    </BrowserRouter>
  );
};

export default RouterConfig;
