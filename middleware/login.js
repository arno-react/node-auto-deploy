export default function ({ store,route, redirect }) {
  console.log(store)
  if(store.state.user.goLogin){
    store.dispatch('user/FedLogOut',false)
    return redirect('/login')
  }

}