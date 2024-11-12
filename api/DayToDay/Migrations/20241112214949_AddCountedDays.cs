using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DayToDay.Migrations
{
    /// <inheritdoc />
    public partial class AddCountedDays : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "dateAdded",
                table: "Tasks",
                newName: "OriginalDate");

            migrationBuilder.AddColumn<int>(
                name: "AmountOfDaysOpen",
                table: "Tasks",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "Tasks",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AmountOfDaysOpen",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "Date",
                table: "Tasks");

            migrationBuilder.RenameColumn(
                name: "OriginalDate",
                table: "Tasks",
                newName: "dateAdded");
        }
    }
}
