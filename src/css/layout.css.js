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
      display: 'flex',
      gridColumn: '2 / -1',
      padding: '0.5rem',
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
      flex: 1,
      padding: '20px'
    },
    nav: {
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
  },
  '@media (min-width: 768px)': {
    '.container': {
      display: 'grid',
      gridTemplateColumns: '180px 1fr',
      gridTemplateRows: 'auto 1fr auto'
    }
  },
}, antDesign)


