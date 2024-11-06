import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { getPath } from '../../utils/i18n';
import NotFound from '../../pages/404';
import { getFlattenRoutes } from '../../routes';

class Body extends React.PureComponent {
  static propTypes = {
    routes: PropTypes.array,
    lang: PropTypes.string,
  };

  static defaultProps = {
    routes: {},
    lang: 'zh-CN',
  };

  componentDidCatch(error) {
    console.error(error);
  }

  render() {
    const { routes, lang } = this.props;

    return (
      <div className="ac-content">
        <Routes>
          {getFlattenRoutes(routes).map((item) => {
            const M = item.component;
            const path = getPath(item.module, item.path, lang);
            return (
              <Route key={path} path={path}>
                {' '}
                <M lang={lang} />
              </Route>
            );
          })}
          <Route exact path="/react" render={() => <Redirect to="/react/docs/start" />} />
          {/* <Redirect from="/docs" to="/docs/spec/introduce" />
          <Redirect from="/docs/spec" to="/docs/spec/introduce" /> */}
          <Route path="*">
            {' '}
            <NotFound />{' '}
          </Route>
        </Routes>
      </div>
    );
  }
}

export default Body;
