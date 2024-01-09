
function UserDetailsNav(props:any) {
  const setTab = props.setTab;

  const clickHandler = (tab:any) => {
    setTab(tab);
  }

  return (
    <>
      <button onClick={()=>clickHandler('general')}>
        General info
      </button>
      <button onClick={()=>clickHandler(`production`)}>
        Production
      </button>
      <button onClick={()=>clickHandler(`access`)}>
        Access
      </button>
    </>
  );
}

export default UserDetailsNav;
