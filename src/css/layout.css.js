Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
  body: {
    fontFamily: "Roboto, sans-serif",
    fontSize: '62.5%'
  },
  '.container': {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  '@media (min-width: 768px)': {
    '.container': {
      display: 'grid',
      gridTemplateColumns: '180px 1fr',
      gridTemplateRows: 'auto 1fr auto'
    }
  },
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
    }
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
  }
}
