import './AddNewStage.css'

function AddNewStage() {
  
const formSubmissionHandler = (event: React.FormEvent) => {
    event.preventDefault();
}


  return (
    <section>
    <div>add new stage</div>
        <form onSubmit={formSubmissionHandler}>
<div className='form-control'>
    <label htmlFor='name'>Nazwa etapu produkcyjnego: </label>
    <input type='text' id="name" />
</div>
<div className='form-actions'>
    <button>Zapisz</button>
</div>
        </form>
    </section>
  )
}

export default AddNewStage