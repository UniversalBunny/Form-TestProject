import React from "react"


export function App(){
    const [form, setForm] = React.useState({
        date: "",
        sum: "",
        category: "",
        comment: ""
    });

    const [expenses, setExpenses] = React.useState([]);
    const [selected, setSelected] = React.useState(null);

    const categories = [
        'Еда',
        'Транспорт',
        'Развлечение',
        'Другое'
    ];

    const handleChange = (event) => {
        const {value, name} = event.currentTarget;
        setForm(prevForm => ({...prevForm,[name]: value}));
    }

    const handleSubmit = (event) => {
       event.preventDefault();
       setExpenses([...expenses, form]);
       setForm({ date: "", sum: "", category: "", comment: "" });
    }
    

    const totalCategorySum = categories.reduce((obj, category) => {
      obj[category] = expenses
      .filter((e) => e.category === category)
      .reduce((sum ,e) => sum + Number(e.sum),0);
      return obj;
    }, {});

    return(
      <main >
        <form onSubmit={handleSubmit} >
            <label>Дата</label>
            <input type="date" name="date" value={form.date} onChange={handleChange}  required />

            <label>Сумма</label>
            <input type="number" name="sum" value={form.sum} onChange={handleChange} required />

             <label>Категория</label>
             <select name="category" value={form.category} onChange={handleChange} required >
               <option value="" disabled>Выберите категорию</option>
               {categories.map((category) => (
                 <option key={category} value={category}>{category}</option>
               ))}
             </select>

            <label>Комментарий</label>
            <input type="text" name="comment" value={form.comment} onChange={handleChange} />
        
           <button type="submit"  className="form-button">Добавить</button>
        </form> 
        <div >
           <h2 >Категории расходов</h2>
           <div className="category-list">
               {categories.map((category) => (
                <button key={category}
                className={`category-button ${selected === category ? "active" : ""}`} 
                onClick={() => setSelected(category === selected ? null : category)}>
                  {category} 
                  <br/>
                  {totalCategorySum[category]}
                </button>
               ))}
            </div>  
        </div>
        {selected && expenses.filter(exp => exp.category === selected).length === 0 
        ? <p className="no-expenses">Нет расходов </p> 
        : <ul className="expenses-list ">
          {expenses.filter(exp => exp.category === selected).map((exp, i) => (
            <li key={i}>{exp.date} - {exp.sum} - {exp.comment}</li>))}
          </ul>}
          {/* {selected && (
            <ul className="expenses-list ">
            {expenses.filter(exp => exp.category === selected).map((exp, i) => (
              <li key={i}>{exp.date} - {exp.sum} {exp.comment}</li>))}
            { expenses.filter(exp => exp.category === selected).length === 0 && <p className="no-expenses">Нет расходов </p>}
            </ul>
          )}     */}
      </main>
    )
}
