module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define("question", {
      body: {
        type: DataTypes.STRING
      },
      fk_quiz: {
        type: DataTypes.INTEGER
      },
  })
  return Question;
}