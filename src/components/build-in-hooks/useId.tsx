import {FC, useId} from "react";

const UseIdExample: FC = () => {
    return (<>
        <EmailForm/>
        <EmailFormWrong/>
        <article>
            <div>Aperiam, esse est labore molestias necessitatibus nesciunt perferendis perspiciatis, praesentium,
                provident reiciendis sapiente sunt totam unde? Consequatur ipsam similique sunt? Ab atque consequatur
                eligendi laborum libero possimus repellendus totam veniam?
            </div>
            <div>Consectetur consequuntur eius eligendi est hic id incidunt libero natus numquam quae quas quia, rem
                rerum tempore, temporibus vel veniam. Ad, aspernatur ea est minus modi officiis quasi ullam voluptates.
            </div>
            <h2>
                При клики на метку нижней красной формы наблюдается неверный фокус, у синий формы нет такого бага.
            </h2>
        </article>
        <EmailFormWrong/>
        <EmailForm/>
    </>)
}

const EmailForm: FC = () => {
    const id = useId();
    return (
        <form style={{backgroundColor: 'blue'}}>
            <label htmlFor={`${id}-email`}>Email</label>
            <input id={`${id}-email`} type={'email'}/>
            <br/>
            <label htmlFor={`${id}-name`}>Name</label>
            <input id={`${id}-name`} type={'text'}/>
        </form>)
}

const EmailFormWrong: FC = () => {
    return (
        <form style={{backgroundColor: 'red'}}>
            <label htmlFor={`email`}>Email</label>
            <input id={`email`} type={'email'}/>
            <br/>
            <label htmlFor={`name`}>Name</label>
            <input id={`name`} type={'text'}/>
        </form>)
}

export default UseIdExample;
