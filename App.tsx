import React from 'react';
import {render} from 'react-dom';
import {Portal} from 'react-overlays';
import {
  Layout,
  Switch,
  AlertComponent,
  ToastComponent,
  ContextMenu
} from 'amis';

const rootEl = document.getElementById('root');

import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/css/v4-shims.css';
import 'amis/lib/themes/cxd.css';
import 'amis/lib/helper.css';
import 'amis-editor/dist/style.css';
import {Editor} from 'amis-editor';
import './assets/third_party/iconfont.css';
import './src/style.scss';

import './src/index';
import './Preview';

function AppLayout(props: any) {
  function renderHeader() {
    return (
      <div id="headerBar" className="box-shadow bg-dark">
        <div className="ae-Layout-brand">AMIS Widget Dev</div>
      </div>
    );
  }

  return (
    <Layout theme={'cxd'} header={renderHeader()} headerFixed={false}>
      <ToastComponent theme="cxd" />
      <AlertComponent theme="cxd" />
      <ContextMenu theme="cxd" />
      {props.children}
    </Layout>
  );
}

const schema: any = {
  title: '表单标题',
  description: '表单描述。。。',
  fields: []
};

class AMISEditor extends React.Component {
  state = {
    preview: !!localStorage.getItem('editting_preview'),
    isMobile: !!localStorage.getItem('editting_preview_mobile'),
    schema: localStorage.getItem('editting_schema')
      ? JSON.parse(localStorage.getItem('editting_schema') as string)
      : schema
  };

  handleChange = (value: any) => {
    localStorage.setItem('editting_schema', JSON.stringify(value));

    this.setState({
      schema: value
    });
  };
  handlePreviewChange = (preview: any) => {
    localStorage.setItem('editting_preview', preview ? 'true' : '');

    this.setState({
      preview: !!preview
    });
  };
  handleMobileChange = (isMobile: any) => {
    localStorage.setItem('editting_preview_mobile', isMobile ? 'true' : '');

    this.setState({
      isMobile: !!isMobile
    });
  };
  clearCache = () => {
    localStorage.removeItem('editting_schema');
    this.setState({
      schema: schema
    });
  };

  render() {
    return (
      <>
        <Portal
          container={() => document.querySelector<HTMLDivElement>('#headerBar')}
        >
          <>
            <div className="inline m-l">
              预览{' '}
              <Switch
                value={this.state.preview}
                onChange={this.handlePreviewChange}
                className="v-middle"
                inline
              />
            </div>
            {/* <div className="inline m-l">
              移动端{' '}
              <Switch
                value={this.state.isMobile}
                onChange={this.handleMobileChange}
                className="v-middle"
                inline
              />
            </div> */}
          </>
        </Portal>

        <Editor
          preview={this.state.preview}
          isMobile={this.state.isMobile}
          value={this.state.schema}
          onChange={this.handleChange}
          className="is-fixed"
          theme="cxd"
          // showCustomRenderersPanel={false} // 是否显示自定义组件面板
        />
      </>
    );
  }
}

render(
  <AppLayout>
    <AMISEditor />
  </AppLayout>,
  rootEl
);
