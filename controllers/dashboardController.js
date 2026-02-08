const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectedId, Types, isValidObjectId } =  require("mongoose");

// Dashboard data
exports.getDashboardData =  async(req, res) => {
    try{
        const userId = req.user.id;
        const userObjectId =  new Type.userObjectId(String(userId));
        
        //Fetch Total Income & Expenses
        const totalIncome = await Income.aggregate([
            {$match: {userId: userObjectId}},
            {$group: {_id: null, total: {$sum: "$amount "}}} ]);
            
        console.log("totalIncome", {totalIncome, userId: isValidObjectId(userId)});
            
        const totalExpense = await Expense.aggregate([
            {$match: {userID: userObjectId }},
            { $group: { _id: null, total: {$sum: "$amount"} }}, 
        ]);
        
        
        // Get Income Transacton in the last 60 Days
        const last60DaysIncomeTransactions = await Income.find({
            userId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1});
        
        //Get total income for last 60 days
        const incomeLast60Days = last60DaysIncomeTransactions.reduce(sum, transaction => sum + transaction.amount, 0);
        
        //Get expense transcation in the last 30 days
        const last30DaysExpenseTransaction = await Expense.find({
            userID,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 *60 * 1000)},
        }).sort({ date: -1});
        
        //Get total Expenses for last 30 Days
        const expensesLass30Days = last30DaysExpenseTransaction.reduce((
            sum, transaction) => sum + transaction.amount, 0
        );
        
        //fetch last 5 transactions (income + expenses)
        const lastTransactuibs = [
         ...((await Income.find({ userId })).toSorted({ date: -1}).limit(5)).map(
            test
         )
        ]
            
    } catch (error) {
        
    }
}