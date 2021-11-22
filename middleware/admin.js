export default function ({$auth, redirect}) {

  if ($auth.user.data.roles.includes('admin')) {
    console.log('ok')
  } else {
    return redirect('/oops')
  }
}
