/**
 * Created by YuDc on 2018/1/13.
 */

export default (theme) => {
  return {
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      padding: '40px 0',
    },
    header: {
      padding: '10px 24px',
      borderBottom: '1px solid #dfdfdf',
      '& h3': {
        margin: 0,
      },
    },
    body: {
      padding: '1px 24px',
      '& img': {
        maxWidth: '100%',
      },
      '& ul, & ol': {
        marginBottom: 7,
      },
    },
    replyHeader: {
      backgroundColor: theme.palette.primary[500],
      padding: '10px 24px',
      color: '#fff',
      display: 'flex',
      justifyContent: 'space-between',
    },
    replies: {
      margin: '24px',
    },
    root: {
      display: 'flex',
      alignItems: 'flex-start',
      padding: 24,
      paddingBottom: 0,
      borderBottom: '1px solid #dfdfdf',
    },
    left: {
      marginRight: 20,
    },
    right: {
      '& img': {
        maxWidth: '100%',
        display: 'block',
      },
    },
    replyEditor: {
      position: 'relative',
      padding: 24,
      borderBottom: '1px solid #dfdfdf',
      '& .CodeMirror': {
        height: 150,
        minHeight: 'auto',
        '& .CodeMirror-scroll': {
          minHeight: 'auto',
        },
      },
    },
    noLoginButton: {
      display: 'flex',
      justifyContent: 'center',
      padding: 24,
    },
    replyButton: {
      position: 'absolute',
      right: 40,
      bottom: 65,
      zIndex: 101,
      opacity: 0.1,
      transition: 'opacity .3s',
      '&:hover': {
        opacity: 1,
      },
    },
  }
}
