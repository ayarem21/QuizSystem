module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define("answer", {
    body: {
      type: DataTypes.STRING
    },
    fk_question: {
      type: DataTypes.INTEGER
    },
    is_right_answer: {
      type: DataTypes.BOOLEAN
    },
  })
  return Answer;
}