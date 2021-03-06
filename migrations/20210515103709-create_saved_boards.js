"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("saved_boards", {
			saved_board_id: {
				type: Sequelize.DataTypes.BIGINT,
				autoIncrement: true,
				allowNull: false,
				primaryKey: true,
			},
			user_id: {
				type: Sequelize.DataTypes.BIGINT,
				allowNull: false,
				references: { model: "users", key: "user_id" },
			},
			board_id: {
				type: Sequelize.DataTypes.BIGINT,
				allowNull: false,
				onDelete: "cascade",
				references: {
					model: "boards",
					key: "board_id",
				},
			},
			is_pinned: {
				type: Sequelize.DataTypes.BOOLEAN,
				default: false,
				allowNull: false,
			},
			created_at: {
				type: Sequelize.DataTypes.DATE,
				allowNull: false,
			},
			updated_at: {
				type: Sequelize.DataTypes.DATE,
				allowNull: true,
			},
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("saved_boards");
	},
};
