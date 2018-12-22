import { INotifyStore, IThemeStore } from '@app/stores';
import { IconButton, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { inject, observer } from 'mobx-react';
import * as React from 'react';

interface INotifyProps {
  notifyStore?: INotifyStore;
  themeStore?: IThemeStore;
}

@inject('notifyStore')
@inject('themeStore')
@observer
class NotificationHandler extends React.Component<INotifyProps, {}> {
  constructor(props, context) {
    super(props, context);
  }

  public render() {
    const { notifyStore } = this.props;
    const current = notifyStore!.current;

    if (!current) {
      return null;
    }
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        open={current.show}
        autoHideDuration={current.type === 'success' ? 3000 : 6000}
        onExited={notifyStore!.handleNext}
        onClose={notifyStore!.hideCurrent}
        ContentProps={{
          'aria-describedby': 'message-id',
          style: this.getNotifyStyles(current.type)
        }}
        message={<span id="message-id">{current.message}</span>}
        action={[
          <IconButton key="close" aria-label="Close" color="secondary" onClick={notifyStore!.hideCurrent}>
            <CloseIcon />
          </IconButton>
        ]}
      />
    );
  }

  private getNotifyStyles = (type: 'success' | 'error') => {
    return {
      success: { borderLeft: `2.5px solid ${this.props.themeStore!.highlightColor}` },
      error: { borderLeft: `2.5px solid ${this.props.themeStore!.theme.colors.error[500]}` }
    }[type];
  };
}

export default NotificationHandler;