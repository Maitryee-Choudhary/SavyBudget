import TransactionDetails from '../TransactionDetails';
const Records = ({transactions}) => {
    return(
        <ul id="list" className="list" responsive="md" >
        {transactions && transactions.map(transact => (
           <TransactionDetails transact={ transact} key ={transact.id} />
        ))}
     </ul>
    )
}

export default Records;