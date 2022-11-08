USE [Loymark]
GO

/****** Object:  Table [dbo].[Activities]    Script Date: 8/11/2022 1:12:28 a. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Activities](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CreationDate] [datetime] NOT NULL,
	[Observation] [nvarchar](50) NOT NULL,
	[UserId] [int] NOT NULL,
 CONSTRAINT [PK_Activities] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Activities]  WITH CHECK ADD  CONSTRAINT [FK_Activities_Users_Id] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO

ALTER TABLE [dbo].[Activities] CHECK CONSTRAINT [FK_Activities_Users_Id]
GO

SET IDENTITY_INSERT [dbo].[Activities] ON 

INSERT [dbo].[Activities] ([Id], [CreationDate], [Observation], [UserId]) VALUES (4, CAST(N'2022-11-04T14:36:21.317' AS DateTime), N'Creación de Usuario', 6)
INSERT [dbo].[Activities] ([Id], [CreationDate], [Observation], [UserId]) VALUES (5, CAST(N'2022-11-04T14:44:37.493' AS DateTime), N'Creación de Usuario', 7)
INSERT [dbo].[Activities] ([Id], [CreationDate], [Observation], [UserId]) VALUES (6, CAST(N'2022-11-04T16:27:43.980' AS DateTime), N'Creación de Usuario', 8)
INSERT [dbo].[Activities] ([Id], [CreationDate], [Observation], [UserId]) VALUES (9, CAST(N'2022-11-04T18:20:17.737' AS DateTime), N'Actualización de Usuario', 9)
INSERT [dbo].[Activities] ([Id], [CreationDate], [Observation], [UserId]) VALUES (1002, CAST(N'2022-11-08T03:53:53.270' AS DateTime), N'Creación de Usuario', 1010)
INSERT [dbo].[Activities] ([Id], [CreationDate], [Observation], [UserId]) VALUES (1003, CAST(N'2022-11-08T03:55:48.967' AS DateTime), N'Creación de Usuario', 1011)
INSERT [dbo].[Activities] ([Id], [CreationDate], [Observation], [UserId]) VALUES (1005, CAST(N'2022-11-08T04:49:01.897' AS DateTime), N'Creación de Usuario', 1013)
INSERT [dbo].[Activities] ([Id], [CreationDate], [Observation], [UserId]) VALUES (1006, CAST(N'2022-11-08T05:48:29.050' AS DateTime), N'Creación de Usuario', 1014)
INSERT [dbo].[Activities] ([Id], [CreationDate], [Observation], [UserId]) VALUES (1007, CAST(N'2022-11-08T05:51:27.893' AS DateTime), N'Actualización de Usuario', 1011)
INSERT [dbo].[Activities] ([Id], [CreationDate], [Observation], [UserId]) VALUES (1008, CAST(N'2022-11-08T05:53:30.513' AS DateTime), N'Actualización de Usuario', 1010)
SET IDENTITY_INSERT [dbo].[Activities] OFF
GO