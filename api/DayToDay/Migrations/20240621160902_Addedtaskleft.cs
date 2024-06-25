using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DayToDay.Migrations
{
    /// <inheritdoc />
    public partial class Addedtaskleft : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "AddTaskLeft",
                table: "AspNetUsers",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "CompleteTaskLeft",
                table: "AspNetUsers",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AddTaskLeft",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "CompleteTaskLeft",
                table: "AspNetUsers");
        }
    }
}
