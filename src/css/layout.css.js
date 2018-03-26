Object.defineProperty(exports, "__esModule", { value: true });

const antDesign = {
  '.searchInput':{
    'button,input':{
      borderRadius: 0,
      border:'none',
      background: 'none',
      color: 'aliceblue',
    },
    'input':{
      borderBottom: '1px solid #666666'
    }
  },
  '.!ant-input-affix-wrapper':{
    '&:hover, &:active':{
      '.!ant-input:not(.!ant-input-disabled)':{
        borderColor: '#999999'
      }
    }
  },
  '.!ant-card-head':{
    minHeight: 'auto'
  },
  '.!ant-card-head-title, .!ant-card-extra':{
    padding: 5
  }
}

exports.default = Object.assign({
  body: {
    fontFamily: "Roboto, sans-serif",
    fontSize: '62.5%'
  },
  '.container': {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    header: {
      marginLeft: 0,
      display: 'flex',
      gridColumn: '2 / -1',
      padding: '0.5rem',
      paddingLeft: '1rem',
      textAlign: 'center',
      fontSize: '1.2rem',
      backgroundColor: '#212121',
      color: 'white',
      h3:{
        color: 'white'
      },
      '>*':{
        whiteSpace: 'nowrap',
        margin: '0 2rem'
      },
    },
    main: {
      marginLeft: 0,
      flex: 1,
      padding: '20px'
    },
    nav: {
      position: 'fixed',
      background: 'white',
      zIndex: 999,
      width: '180px',
      top: 0,
      left: -180,
      gridRow: '1 / -1',
      backgroundColor: 'rgba(238, 238, 238, 0.23)',
      padding: '0px',
      borderRight: '1px solid #e8e8e8',
      '.!ant-menu-inline, .!ant-menu-vertical, .!ant-menu-vertical-left':{
        borderRight: 'none',
      },
      '.!ant-card':{
        borderTop: '1px solid #ccc'
      },
      '.!ant-menu:not(.!ant-menu-horizontal)':{
        '.!ant-menu-item-selected':{
          backgroundColor: 'rgba(0,0,0,.12)'
        },
        '.!ant-menu-item':{
          color: 'rgba(0,0,0,.87)'
        }
      },
      '.menuHandler':{
        position: 'fixed',
        zIndex: 9e9,
        left: 0,
        top: 0,
        fontSize: '2rem',
        color: 'white',
        background: 'rgba(0,0,0,0.3)',
        padding: '0.5rem',
        transition: 'left 0.25s ease-out',
      },
      '.drawerBg':{
        position: 'fixed',
        zIndex: 99999,
        left: 0,
        top: 0,
        bottom:0,
        right:0,
        background: 'rgba(0,0,0,0.3)',
        display: 'none'
      }
    },
    aside: {
      padding: '20px',
      backgroundColor: '#936'
    },
    footer: {
      gridColumn: '1 / -1',
      padding: '30px',
      textAlign: 'center',
      fontSize: '1.2rem',
      backgroundColor: '#690',
      color: 'white'
    },

    '&>*':{
      transition: 'left 0.25s ease-out, margin-left 0.25s ease-out',
    },
    '&.unfold':{
      nav:{
        left: 0,
      },
      'header':{
        marginLeft: 180
      },
      '.menuHandler':{
        left: 180
      },
      '.drawerBg':{
        display: 'block'
      }
    },
  },
  '@media (min-width: 768px)': {
    '.container': {
      // display: 'grid',
      gridTemplateColumns: '180px 1fr',
      gridTemplateRows: 'auto 1fr auto',
      'header,main':{
        marginLeft: 180
      },
      header:{
        paddingLeft: 0,
      },
      nav:{
        left: 0,
      },
      '.menuHandler':{
        display: 'none'
      }
    },
  },
}, antDesign)


