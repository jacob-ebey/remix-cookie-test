import { LoaderFunction, redirect } from 'remix'
import { previewUrlParams } from '../../lib/utils/loaderHelpers'

export let loader: LoaderFunction = async ({request}) => {
  return redirect('https://etheadless.local/wp-admin')
}
