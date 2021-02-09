const Tasks = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {
      organizer: {
        type: DataTypes.STRING,
        unique: true,
        validate: { isAlpha: true, len: [0, 20] },
      },
      name: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING, validate: { isEmail: true } },
      date: {
        type: DataTypes.STRING,
        validate: { isDate: true, isAfter: "2015-01-02" },
      },
      numOfSeats: { type: DataTypes.INTEGER, validate: { min: 0 } },
      bookedSeats: { type: DataTypes.INTEGER },
      startDate: {
        type: DataTypes.DATE,
        validate: {
          StartDateValidate(value) {
            if (this.endDate === null && value === null) {
              throw new Error(
                "this can not be null, becuase endDate is already null"
              );
            }
          },
        },
      },
      endDate: {
        type: DataTypes.DATE,
        validate: {
          EndDateValidate(value) {
            if (this.startDate === null && value === null) {
              throw new Error(
                "this can not be null, becuase endDate is already null"
              );
            }
          },
        },
      },
      image: {
        type: DataTypes.STRING,
        isNull: false,
        validate: { isUrl: true },
      },
    },
    { timestamps: false }
  );
  return Task;
};
module.exports = Tasks;
