USE [Loymark]
GO

/****** Object:  Table [dbo].[Users]    Script Date: 8/11/2022 1:11:29 a. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Users](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](20) NOT NULL,
	[Lastname] [nvarchar](20) NOT NULL,
	[Email] [nvarchar](200) NOT NULL,
	[BirthDate] [datetime] NOT NULL,
	[Phone] [nvarchar](15) NULL,
	[ResidenceCountry] [nvarchar](3) NOT NULL,
	[ReceiveInformation] [bit] NOT NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([Id], [Name], [Lastname], [Email], [BirthDate], [Phone], [ResidenceCountry], [ReceiveInformation]) VALUES (6, N'William', N'Ballesteros', N'ballesteroswilliam@gmail.com', CAST(N'1981-05-11T02:23:46.323' AS DateTime), N'3015168408', N'COL', 1)
INSERT [dbo].[Users] ([Id], [Name], [Lastname], [Email], [BirthDate], [Phone], [ResidenceCountry], [ReceiveInformation]) VALUES (7, N'William', N'Ballesteros', N'ballesteroswilliam@gmail.com', CAST(N'1981-05-11T02:23:46.323' AS DateTime), N'3015168408', N'COL', 1)
INSERT [dbo].[Users] ([Id], [Name], [Lastname], [Email], [BirthDate], [Phone], [ResidenceCountry], [ReceiveInformation]) VALUES (8, N'William', N'Ballesteros', N'ballesteroswilliam@gmail.com', CAST(N'1981-05-11T02:23:46.323' AS DateTime), N'3015168408', N'COL', 1)
INSERT [dbo].[Users] ([Id], [Name], [Lastname], [Email], [BirthDate], [Phone], [ResidenceCountry], [ReceiveInformation]) VALUES (9, N'Davith', N'Ballesteros', N'ballesteroswilliam@gmail.com', CAST(N'1981-05-11T02:23:46.323' AS DateTime), N'3015168408', N'COL', 1)
INSERT [dbo].[Users] ([Id], [Name], [Lastname], [Email], [BirthDate], [Phone], [ResidenceCountry], [ReceiveInformation]) VALUES (1010, N'Alvaro', N'Ballesteros', N'test@test.com', CAST(N'2013-11-01T00:00:00.000' AS DateTime), N'3207778888', N'DNK', 1)
INSERT [dbo].[Users] ([Id], [Name], [Lastname], [Email], [BirthDate], [Phone], [ResidenceCountry], [ReceiveInformation]) VALUES (1011, N'Aleja', N'Silva', N'test@test.com', CAST(N'2014-11-07T22:54:00.000' AS DateTime), N'3207778888', N'BGD', 1)
INSERT [dbo].[Users] ([Id], [Name], [Lastname], [Email], [BirthDate], [Phone], [ResidenceCountry], [ReceiveInformation]) VALUES (1013, N'Davith Alejandro', N'Ballesteros Silva', N'ballesterosdavith@gmail.com', CAST(N'2012-11-07T00:00:00.000' AS DateTime), N'3207778888', N'TCD', 0)
INSERT [dbo].[Users] ([Id], [Name], [Lastname], [Email], [BirthDate], [Phone], [ResidenceCountry], [ReceiveInformation]) VALUES (1014, N'Davith', N'Ballesteros', N'ballesteroswilliam@gmail.com', CAST(N'1981-05-11T02:23:00.000' AS DateTime), N'3015168408', N'COD', 0)
SET IDENTITY_INSERT [dbo].[Users] OFF
GO