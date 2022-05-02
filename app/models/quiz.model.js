module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define("quiz", {
    title: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    isArchived: {
      type: DataTypes.BOOLEAN
    },
  })
  return Question;
}