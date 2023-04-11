import { Provider } from 'react-redux'
import Layout from '../components/Layout'
import '../styles/globals.css'
import { store } from '../store'

export default function App({ Component, pageProps }) 
{
  const component = 
  <>
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  </>

  return component
}
