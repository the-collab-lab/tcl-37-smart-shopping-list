import React, { Fragment } from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

export const RouteLink = ({ children, to }) => {
  let resolved = useResolvedPath(to);

  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Fragment>
      <Link style={{ fontWeight: match ? 'bold' : 'normal' }} to={to}>
        {children}
      </Link>
    </Fragment>
  );
};